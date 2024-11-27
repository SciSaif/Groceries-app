import { cn } from '@/lib/utils';
import React from 'react'
import { Button } from './ui/button';
import { CategoryType } from './CategorySelector';


interface CategoryButtonProps {
    category: CategoryType;
    isSelected: boolean;
    onClick: (category: CategoryType) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onClick }) => {
    return (
        <Button
            variant={"outline"}
            className={cn(
                'px-4 py-2 rounded-md',
                isSelected ? 'border-red-300 text-red-300' : ' text-gray-700',
                'transition-colors rounded-full px-5 outline-none focus:outline-none shadow'
            )}
            onClick={() => onClick(category)}
        >
            {category.label}
        </Button>
    );
};
export default CategoryButton