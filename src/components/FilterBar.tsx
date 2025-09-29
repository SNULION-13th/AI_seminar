import React from 'react';
import { Button } from './ui/button';
import { categories } from '../data/mockData';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`whitespace-nowrap rounded-full ${
                selectedCategory === category.id 
                  ? 'bg-indigo-700 hover:bg-indigo-800 text-white border-0' 
                  : 'hover:bg-muted border-border'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}