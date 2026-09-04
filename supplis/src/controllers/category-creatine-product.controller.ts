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
  CreatineProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryCreatineProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/creatine-products', {
    responses: {
      '200': {
        description: 'Array of Category has many CreatineProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CreatineProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CreatineProduct>,
  ): Promise<CreatineProduct[]> {
    return this.categoryRepository.creatineProducts(id).find(filter);
  }

  @post('/categories/{id}/creatine-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(CreatineProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatineProduct, {
            title: 'NewCreatineProductInCategory',
            exclude: ['id'],
            optional: ['category']
          }),
        },
      },
    }) creatineProduct: Omit<CreatineProduct, 'id'>,
  ): Promise<CreatineProduct> {
    return this.categoryRepository.creatineProducts(id).create(creatineProduct);
  }

  @patch('/categories/{id}/creatine-products', {
    responses: {
      '200': {
        description: 'Category.CreatineProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreatineProduct, {partial: true}),
        },
      },
    })
    creatineProduct: Partial<CreatineProduct>,
    @param.query.object('where', getWhereSchemaFor(CreatineProduct)) where?: Where<CreatineProduct>,
  ): Promise<Count> {
    return this.categoryRepository.creatineProducts(id).patch(creatineProduct, where);
  }

  @del('/categories/{id}/creatine-products', {
    responses: {
      '200': {
        description: 'Category.CreatineProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CreatineProduct)) where?: Where<CreatineProduct>,
  ): Promise<Count> {
    return this.categoryRepository.creatineProducts(id).delete(where);
  }
}
