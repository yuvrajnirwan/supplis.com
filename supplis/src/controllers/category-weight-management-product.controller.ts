import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Category,
  WeightManagementProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryWeightManagementProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/weight-management-products', {
    responses: {
      '200': {
        description: 'Array of Category has many WeightManagementProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(WeightManagementProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<WeightManagementProduct>,
  ): Promise<WeightManagementProduct[]> {
    return this.categoryRepository.weightManagementProducts(id).find(filter);
  }

  @post('/categories/{id}/weight-management-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(WeightManagementProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeightManagementProduct, {
            title: 'NewWeightManagementProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) weightManagementProduct: Omit<WeightManagementProduct, 'id'>,
  ): Promise<WeightManagementProduct> {
    return this.categoryRepository.weightManagementProducts(id).create(weightManagementProduct);
  }

  @patch('/categories/{id}/weight-management-products', {
    responses: {
      '200': {
        description: 'Category.WeightManagementProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeightManagementProduct, {partial: true}),
        },
      },
    })
    weightManagementProduct: Partial<WeightManagementProduct>,
    @param.query.object('where', getWhereSchemaFor(WeightManagementProduct)) where?: Where<WeightManagementProduct>,
  ): Promise<Count> {
    return this.categoryRepository.weightManagementProducts(id).patch(weightManagementProduct, where);
  }

  @del('/categories/{id}/weight-management-products', {
    responses: {
      '200': {
        description: 'Category.WeightManagementProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(WeightManagementProduct)) where?: Where<WeightManagementProduct>,
  ): Promise<Count> {
    return this.categoryRepository.weightManagementProducts(id).delete(where);
  }
}
