import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CreatineProduct,
  Category,
} from '../models';
import {CreatineProductRepository} from '../repositories';

export class CreatineProductCategoryController {
  constructor(
    @repository(CreatineProductRepository)
    public creatineProductRepository: CreatineProductRepository,
  ) { }

  @get('/creatine-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to CreatineProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof CreatineProduct.prototype.id,
  ): Promise<Category> {
    return this.creatineProductRepository.category(id);
  }
}
