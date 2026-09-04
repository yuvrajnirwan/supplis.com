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
import { CreatineProduct } from '../models';
import { CreatineProductRepository } from '../repositories';
import { authenticate, STRATEGY } from "loopback4-authentication";
import { authorize } from "loopback4-authorization";

export class CreatineProductController {
  constructor(
    @repository(CreatineProductRepository)
    public creatineProductRepository: CreatineProductRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @post('/creatine-products')
  @response(200, {
    description: 'CreatineProduct model instance',
    content: { 'application/json': { schema: getModelSchemaRef(CreatineProduct) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatineProduct, {
            title: 'NewCreatineProduct',
          }),
        },
      },
    })
    creatineProduct: CreatineProduct,
  ): Promise<CreatineProduct> {
    return this.creatineProductRepository.create(creatineProduct);
  }

  @authorize({permissions: ['*']})
  @get('/creatine-products/count')
  @response(200, {
    description: 'CreatineProduct model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(CreatineProduct) where?: Where<CreatineProduct>,
  ): Promise<Count> {
    return this.creatineProductRepository.count(where);
  }

  @authorize({permissions: ['*']})
  @get('/creatine-products')
  @response(200, {
    description: 'Array of CreatineProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CreatineProduct, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(CreatineProduct) filter?: Filter<CreatineProduct>,
  ): Promise<CreatineProduct[]> {
    return this.creatineProductRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/creatine-products')
  @response(200, {
    description: 'CreatineProduct PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatineProduct, { partial: true }),
        },
      },
    })
    creatineProduct: CreatineProduct,
    @param.where(CreatineProduct) where?: Where<CreatineProduct>,
  ): Promise<Count> {
    return this.creatineProductRepository.updateAll(creatineProduct, where);
  }

  @authorize({permissions: ['*']})
  @get('/creatine-products/{id}')
  @response(200, {
    description: 'CreatineProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CreatineProduct, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CreatineProduct, { exclude: 'where' }) filter?: FilterExcludingWhere<CreatineProduct>,
  ): Promise<CreatineProduct> {
    return this.creatineProductRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/creatine-products/{id}')
  @response(204, {
    description: 'CreatineProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatineProduct, { partial: true }),
        },
      },
    })
    creatineProduct: CreatineProduct,
  ): Promise<void> {
    await this.creatineProductRepository.updateById(id, creatineProduct);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @put('/creatine-products/{id}')
  @response(204, {
    description: 'CreatineProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() creatineProduct: CreatineProduct,
  ): Promise<void> {
    await this.creatineProductRepository.replaceById(id, creatineProduct);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @del('/creatine-products/{id}')
  @response(204, {
    description: 'CreatineProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.creatineProductRepository.deleteById(id);
  }
}
