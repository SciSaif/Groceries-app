import React, { useContext } from 'react';
import CategoryButton from './CategoryButton';
import { ItemContext } from '@/context/ItemContext';

export type CategoryType = { label: string; value: string };

const CATEGORIES = [{ label: 'All items', value: 'all' }, { label: 'Drinks', value: 'drinks' }, { label: 'Fruit', value: 'fruit' }, { label: 'Bakery', value: 'bakery' }];

const CategorySelector: React.FC = () => {
    const { fetchItems, selectedCategory } = useContext(ItemContext);

    const handleCategoryClick = (category: CategoryType) => {
        fetchItems(category.value);
    };


    return (
        <div className="flex space-x-4">
            {CATEGORIES.map((category) => (
                <CategoryButton
                    key={category.value}
                    category={category}
                    isSelected={selectedCategory === category.value}
                    onClick={handleCategoryClick}
                />
            ))}
        </div>
    );
};

export default CategorySelector;