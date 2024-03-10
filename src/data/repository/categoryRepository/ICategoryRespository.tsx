import { Category } from "../../types/Categoty";

interface ICategoryRepository {
    getCategories: () => Promise<Category[]>
}

export default ICategoryRepository