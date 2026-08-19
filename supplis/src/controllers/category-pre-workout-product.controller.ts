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
  PreWorkoutProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryPreWorkoutProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/pre-workout-products', {
    responses: {
      '200': {
        description: 'Array of Category has many PreWorkoutProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PreWorkoutProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PreWorkoutProduct>,
  ): Promise<PreWorkoutProduct[]> {
    return this.categoryRepository.preWorkoutProducts(id).find(filter);
  }

  @post('/categories/{id}/pre-workout-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(PreWorkoutProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PreWorkoutProduct, {
            title: 'NewPreWorkoutProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) preWorkoutProduct: Omit<PreWorkoutProduct, 'id'>,
  ): Promise<PreWorkoutProduct> {
    return this.categoryRepository.preWorkoutProducts(id).create(preWorkoutProduct);
  }

  @patch('/categories/{id}/pre-workout-products', {
    responses: {
      '200': {
        description: 'Category.PreWorkoutProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PreWorkoutProduct, {partial: true}),
        },
      },
    })
    preWorkoutProduct: Partial<PreWorkoutProduct>,
    @param.query.object('where', getWhereSchemaFor(PreWorkoutProduct)) where?: Where<PreWorkoutProduct>,
  ): Promise<Count> {
    return this.categoryRepository.preWorkoutProducts(id).patch(preWorkoutProduct, where);
  }

  @del('/categories/{id}/pre-workout-products', {
    responses: {
      '200': {
        description: 'Category.PreWorkoutProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PreWorkoutProduct)) where?: Where<PreWorkoutProduct>,
  ): Promise<Count> {
    return this.categoryRepository.preWorkoutProducts(id).delete(where);
  }
}
