import { Category } from "../../types/Categoty";

interface ICategoryRepository {
    getAll: () => Promise<Category[]>
}

export default ICategoryRepository