import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AminoProduct,
  Category,
} from '../models';
import {AminoProductRepository} from '../repositories';

export class AminoProductCategoryController {
  constructor(
    @repository(AminoProductRepository)
    public aminoProductRepository: AminoProductRepository,
  ) { }

  @get('/amino-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to AminoProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof AminoProduct.prototype.id,
  ): Promise<Category> {
    return this.aminoProductRepository.category(id);
  }
}
