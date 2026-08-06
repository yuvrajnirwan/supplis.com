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
import {WeightManagementProduct} from '../models';
import {WeightManagementProductRepository} from '../repositories';

export class WeightManageController {
  constructor(
    @repository(WeightManagementProductRepository)
    public weightManagementProductRepository : WeightManagementProductRepository,
  ) {}

  @post('/weight-management-products')
  @response(200, {
    description: 'WeightManagementProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(WeightManagementProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeightManagementProduct, {
            title: 'NewWeightManagementProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    weightManagementProduct: Omit<WeightManagementProduct, 'id'>,
  ): Promise<WeightManagementProduct> {
    return this.weightManagementProductRepository.create(weightManagementProduct);
  }

  @get('/weight-management-products/count')
  @response(200, {
    description: 'WeightManagementProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WeightManagementProduct) where?: Where<WeightManagementProduct>,
  ): Promise<Count> {
    return this.weightManagementProductRepository.count(where);
  }

  @get('/weight-management-products')
  @response(200, {
    description: 'Array of WeightManagementProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WeightManagementProduct, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WeightManagementProduct) filter?: Filter<WeightManagementProduct>,
  ): Promise<WeightManagementProduct[]> {
    return this.weightManagementProductRepository.find(filter);
  }

  @patch('/weight-management-products')
  @response(200, {
    description: 'WeightManagementProduct PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeightManagementProduct, {partial: true}),
        },
      },
    })
    weightManagementProduct: WeightManagementProduct,
    @param.where(WeightManagementProduct) where?: Where<WeightManagementProduct>,
  ): Promise<Count> {
    return this.weightManagementProductRepository.updateAll(weightManagementProduct, where);
  }

  @get('/weight-management-products/{id}')
  @response(200, {
    description: 'WeightManagementProduct model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WeightManagementProduct, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WeightManagementProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<WeightManagementProduct>
  ): Promise<WeightManagementProduct> {
    return this.weightManagementProductRepository.findById(id, filter);
  }

  @patch('/weight-management-products/{id}')
  @response(204, {
    description: 'WeightManagementProduct PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeightManagementProduct, {partial: true}),
        },
      },
    })
    weightManagementProduct: WeightManagementProduct,
  ): Promise<void> {
    await this.weightManagementProductRepository.updateById(id, weightManagementProduct);
  }

  @put('/weight-management-products/{id}')
  @response(204, {
    description: 'WeightManagementProduct PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() weightManagementProduct: WeightManagementProduct,
  ): Promise<void> {
    await this.weightManagementProductRepository.replaceById(id, weightManagementProduct);
  }

  @del('/weight-management-products/{id}')
  @response(204, {
    description: 'WeightManagementProduct DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.weightManagementProductRepository.deleteById(id);
  }
}
