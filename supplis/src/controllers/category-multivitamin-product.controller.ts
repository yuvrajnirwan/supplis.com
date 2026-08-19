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
  MultivitaminProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryMultivitaminProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/multivitamin-products', {
    responses: {
      '200': {
        description: 'Array of Category has many MultivitaminProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MultivitaminProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MultivitaminProduct>,
  ): Promise<MultivitaminProduct[]> {
    return this.categoryRepository.multivitaminProducts(id).find(filter);
  }

  @post('/categories/{id}/multivitamin-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(MultivitaminProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MultivitaminProduct, {
            title: 'NewMultivitaminProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) multivitaminProduct: Omit<MultivitaminProduct, 'id'>,
  ): Promise<MultivitaminProduct> {
    return this.categoryRepository.multivitaminProducts(id).create(multivitaminProduct);
  }

  @patch('/categories/{id}/multivitamin-products', {
    responses: {
      '200': {
        description: 'Category.MultivitaminProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MultivitaminProduct, {partial: true}),
        },
      },
    })
    multivitaminProduct: Partial<MultivitaminProduct>,
    @param.query.object('where', getWhereSchemaFor(MultivitaminProduct)) where?: Where<MultivitaminProduct>,
  ): Promise<Count> {
    return this.categoryRepository.multivitaminProducts(id).patch(multivitaminProduct, where);
  }

  @del('/categories/{id}/multivitamin-products', {
    responses: {
      '200': {
        description: 'Category.MultivitaminProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MultivitaminProduct)) where?: Where<MultivitaminProduct>,
  ): Promise<Count> {
    return this.categoryRepository.multivitaminProducts(id).delete(where);
  }
}
