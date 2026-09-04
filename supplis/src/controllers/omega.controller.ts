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
import {OmegaProduct} from '../models';
import {OmegaProductRepository} from '../repositories';
import { authenticate, STRATEGY } from "loopback4-authentication";
import { authorize } from "loopback4-authorization";

export class OmegaController {
  constructor(
    @repository(OmegaProductRepository)
    public omegaProductRepository : OmegaProductRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @post('/omega-products')
  @response(200, {
    description: 'OmegaProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(OmegaProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OmegaProduct, {
            title: 'NewOmegaProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    omegaProduct: Omit<OmegaProduct, 'id'>,
  ): Promise<OmegaProduct> {
    return this.omegaProductRepository.create(omegaProduct);
  }

  @authorize({permissions: ['*']})
  @get('/omega-products/count')
  @response(200, {
    description: 'OmegaProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OmegaProduct) where?: Where<OmegaProduct>,
  ): Promise<Count> {
    return this.omegaProductRepository.count(where);
  }

  @authorize({permissions: ['*']})
  @get('/omega-products')
  @response(200, {
    description: 'Array of OmegaProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OmegaProduct, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OmegaProduct) filter?: Filter<OmegaProduct>,
  ): Promise<OmegaProduct[]> {
    return this.omegaProductRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/omega-products')
  @response(200, {
    description: 'OmegaProduct PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OmegaProduct, {partial: true}),
        },
      },
    })
    omegaProduct: OmegaProduct,
    @param.where(OmegaProduct) where?: Where<OmegaProduct>,
  ): Promise<Count> {
    return this.omegaProductRepository.updateAll(omegaProduct, where);
  }

  @authorize({permissions: ['*']})
  @get('/omega-products/{id}')
  @response(200, {
    description: 'OmegaProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OmegaProduct, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OmegaProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<OmegaProduct>
  ): Promise<OmegaProduct> {
    return this.omegaProductRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/omega-products/{id}')
  @response(204, {
    description: 'OmegaProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OmegaProduct, {partial: true}),
        },
      },
    })
    omegaProduct: OmegaProduct,
  ): Promise<void> {
    await this.omegaProductRepository.updateById(id, omegaProduct);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @put('/omega-products/{id}')
  @response(204, {
    description: 'OmegaProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() omegaProduct: OmegaProduct,
  ): Promise<void> {
    await this.omegaProductRepository.replaceById(id, omegaProduct);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @del('/omega-products/{id}')
  @response(204, {
    description: 'OmegaProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.omegaProductRepository.deleteById(id);
  }
}
