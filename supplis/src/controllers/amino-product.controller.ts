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
import { AminoProduct } from '../models';
import { AminoProductRepository } from '../repositories';
import { authenticate, STRATEGY } from "loopback4-authentication";
import { authorize } from "loopback4-authorization";

export class AminoProductController {
  constructor(
    @repository(AminoProductRepository)
    public aminoProductRepository: AminoProductRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @post('/amino-products')
  @response(200, {
    description: 'AminoProduct model instance',
    content: { 'application/json': { schema: getModelSchemaRef(AminoProduct) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AminoProduct, {
            title: 'NewAminoProduct',
          }),
        },
      },
    })
    aminoProduct: AminoProduct,
  ): Promise<AminoProduct> {
    return this.aminoProductRepository.create(aminoProduct);
  }

  @get('/amino-products/count')
  @response(200, {
    description: 'AminoProduct model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(AminoProduct) where?: Where<AminoProduct>,
  ): Promise<Count> {
    return this.aminoProductRepository.count(where);
  }

  @get('/amino-products')
  @response(200, {
    description: 'Array of AminoProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AminoProduct, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(AminoProduct) filter?: Filter<AminoProduct>,
  ): Promise<AminoProduct[]> {
    return this.aminoProductRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/amino-products')
  @response(200, {
    description: 'AminoProduct PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AminoProduct, { partial: true }),
        },
      },
    })
    aminoProduct: AminoProduct,
    @param.where(AminoProduct) where?: Where<AminoProduct>,
  ): Promise<Count> {
    return this.aminoProductRepository.updateAll(aminoProduct, where);
  }

  @get('/amino-products/{id}')
  @response(200, {
    description: 'AminoProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AminoProduct, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AminoProduct, { exclude: 'where' }) filter?: FilterExcludingWhere<AminoProduct>,
  ): Promise<AminoProduct> {
    return this.aminoProductRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @patch('/amino-products/{id}')
  @response(204, {
    description: 'AminoProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AminoProduct, { partial: true }),
        },
      },
    })
    aminoProduct: AminoProduct,
  ): Promise<void> {
    await this.aminoProductRepository.updateById(id, aminoProduct);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @put('/amino-products/{id}')
  @response(204, {
    description: 'AminoProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aminoProduct: AminoProduct,
  ): Promise<void> {
    await this.aminoProductRepository.replaceById(id, aminoProduct);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['Admin', 'Manager']})
  @del('/amino-products/{id}')
  @response(204, {
    description: 'AminoProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aminoProductRepository.deleteById(id);
  }
}
