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
  OmegaProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryOmegaProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/omega-products', {
    responses: {
      '200': {
        description: 'Array of Category has many OmegaProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OmegaProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OmegaProduct>,
  ): Promise<OmegaProduct[]> {
    return this.categoryRepository.omegaProducts(id).find(filter);
  }

  @post('/categories/{id}/omega-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(OmegaProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OmegaProduct, {
            title: 'NewOmegaProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) omegaProduct: Omit<OmegaProduct, 'id'>,
  ): Promise<OmegaProduct> {
    return this.categoryRepository.omegaProducts(id).create(omegaProduct);
  }

  @patch('/categories/{id}/omega-products', {
    responses: {
      '200': {
        description: 'Category.OmegaProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OmegaProduct, {partial: true}),
        },
      },
    })
    omegaProduct: Partial<OmegaProduct>,
    @param.query.object('where', getWhereSchemaFor(OmegaProduct)) where?: Where<OmegaProduct>,
  ): Promise<Count> {
    return this.categoryRepository.omegaProducts(id).patch(omegaProduct, where);
  }

  @del('/categories/{id}/omega-products', {
    responses: {
      '200': {
        description: 'Category.OmegaProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OmegaProduct)) where?: Where<OmegaProduct>,
  ): Promise<Count> {
    return this.categoryRepository.omegaProducts(id).delete(where);
  }
}
