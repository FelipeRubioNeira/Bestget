import { Collections } from "../../collections/Collections";
import { Category } from "../../types/Categoty";
import ICategoryRepository from "./ICategoryRespository";
import firestore from '@react-native-firebase/firestore';

class CategoryRespository implements ICategoryRepository {

    async getAll(): Promise<Category[]> {

        try {

            const categoriesFirebase = await firestore()
                .collection(Collections.CATEGOTY)
                .orderBy('name')
                .get()

            const categories: Category[] = []

            categoriesFirebase.docs.forEach(doc => {

                const { id, name, color } = doc.data()

                const newCategorie: Category = {
                    id: id,
                    name: name,
                    color: color
                }

                categories.push(newCategorie)
            })

            return categories

        } catch (error) {
            console.error("error getCategories repository", error);
            return []
        }
    }

}

export default CategoryRespository