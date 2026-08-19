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
  SingleVitaminProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategorySingleVitaminProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/single-vitamin-products', {
    responses: {
      '200': {
        description: 'Array of Category has many SingleVitaminProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SingleVitaminProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SingleVitaminProduct>,
  ): Promise<SingleVitaminProduct[]> {
    return this.categoryRepository.singleVitaminProducts(id).find(filter);
  }

  @post('/categories/{id}/single-vitamin-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(SingleVitaminProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleVitaminProduct, {
            title: 'NewSingleVitaminProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) singleVitaminProduct: Omit<SingleVitaminProduct, 'id'>,
  ): Promise<SingleVitaminProduct> {
    return this.categoryRepository.singleVitaminProducts(id).create(singleVitaminProduct);
  }

  @patch('/categories/{id}/single-vitamin-products', {
    responses: {
      '200': {
        description: 'Category.SingleVitaminProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleVitaminProduct, {partial: true}),
        },
      },
    })
    singleVitaminProduct: Partial<SingleVitaminProduct>,
    @param.query.object('where', getWhereSchemaFor(SingleVitaminProduct)) where?: Where<SingleVitaminProduct>,
  ): Promise<Count> {
    return this.categoryRepository.singleVitaminProducts(id).patch(singleVitaminProduct, where);
  }

  @del('/categories/{id}/single-vitamin-products', {
    responses: {
      '200': {
        description: 'Category.SingleVitaminProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SingleVitaminProduct)) where?: Where<SingleVitaminProduct>,
  ): Promise<Count> {
    return this.categoryRepository.singleVitaminProducts(id).delete(where);
  }
}
