import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SaltProduct} from '../models';
import {SaltProductRepository} from '../repositories';
import { authenticate, STRATEGY } from "loopback4-authentication";
import { authorize } from "loopback4-authorization";

export class SaltController {
  constructor(
    @repository(SaltProductRepository)
    public saltProductRepository : SaltProductRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @post('/salt-products')
  @response(200, {
    description: 'SaltProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(SaltProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaltProduct, {
            title: 'NewSaltProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    saltProduct: Omit<SaltProduct, 'id'>,
  ): Promise<SaltProduct> {
    return this.saltProductRepository.create(saltProduct);
  }

  @authorize({permissions: ['*']})
  @get('/salt-products/count')
  @response(200, {
    description: 'SaltProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SaltProduct) where?: Where<SaltProduct>,
  ): Promise<Count> {
    return this.saltProductRepository.count(where);
  }

  @authorize({permissions: ['*']})
  @get('/salt-products')
  @response(200, {
    description: 'Array of SaltProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SaltProduct, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SaltProduct) filter?: Filter<SaltProduct>,
  ): Promise<SaltProduct[]> {
    return this.saltProductRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/salt-products')
  @response(200, {
    description: 'SaltProduct PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaltProduct, {partial: true}),
        },
      },
    })
    saltProduct: SaltProduct,
    @param.where(SaltProduct) where?: Where<SaltProduct>,
  ): Promise<Count> {
    return this.saltProductRepository.updateAll(saltProduct, where);
  }

  @authorize({permissions: ['*']})
  @get('/salt-products/{id}')
  @response(200, {
    description: 'SaltProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SaltProduct, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SaltProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<SaltProduct>
  ): Promise<SaltProduct> {
    return this.saltProductRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/salt-products/{id}')
  @response(204, {
    description: 'SaltProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaltProduct, {partial: true}),
        },
      },
    })
    saltProduct: SaltProduct,
  ): Promise<void> {
    await this.saltProductRepository.updateById(id, saltProduct);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @put('/salt-products/{id}')
  @response(204, {
    description: 'SaltProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() saltProduct: SaltProduct,
  ): Promise<void> {
    await this.saltProductRepository.replaceById(id, saltProduct);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @del('/salt-products/{id}')
  @response(204, {
    description: 'SaltProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.saltProductRepository.deleteById(id);
  }
}
