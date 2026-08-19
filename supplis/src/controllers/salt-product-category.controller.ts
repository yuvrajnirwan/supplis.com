import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SaltProduct,
  Category,
} from '../models';
import {SaltProductRepository} from '../repositories';

export class SaltProductCategoryController {
  constructor(
    @repository(SaltProductRepository)
    public saltProductRepository: SaltProductRepository,
  ) { }

  @get('/salt-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to SaltProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof SaltProduct.prototype.id,
  ): Promise<Category> {
    return this.saltProductRepository.category(id);
  }
}
