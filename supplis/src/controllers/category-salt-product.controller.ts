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
  SaltProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategorySaltProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/salt-products', {
    responses: {
      '200': {
        description: 'Array of Category has many SaltProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SaltProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SaltProduct>,
  ): Promise<SaltProduct[]> {
    return this.categoryRepository.saltProducts(id).find(filter);
  }

  @post('/categories/{id}/salt-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(SaltProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaltProduct, {
            title: 'NewSaltProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) saltProduct: Omit<SaltProduct, 'id'>,
  ): Promise<SaltProduct> {
    return this.categoryRepository.saltProducts(id).create(saltProduct);
  }

  @patch('/categories/{id}/salt-products', {
    responses: {
      '200': {
        description: 'Category.SaltProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaltProduct, {partial: true}),
        },
      },
    })
    saltProduct: Partial<SaltProduct>,
    @param.query.object('where', getWhereSchemaFor(SaltProduct)) where?: Where<SaltProduct>,
  ): Promise<Count> {
    return this.categoryRepository.saltProducts(id).patch(saltProduct, where);
  }

  @del('/categories/{id}/salt-products', {
    responses: {
      '200': {
        description: 'Category.SaltProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SaltProduct)) where?: Where<SaltProduct>,
  ): Promise<Count> {
    return this.categoryRepository.saltProducts(id).delete(where);
  }
}
