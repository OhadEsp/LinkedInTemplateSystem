import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Heart, Star, Sparkles, Filter } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageTemplateApi, templateCategoryApi } from '../services/api';
import { MessageTemplate, TemplateCategory } from '../types';
import TemplateCard from './TemplateCard';
import CreateTemplateModal from './CreateTemplateModal';
import AIGenerateModal from './AIGenerateModal';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MessageTemplate) => void;
  contactName: string;
  contactTitle: string;
  contactCompany: string;
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  contactName,
  contactTitle,
  contactCompany
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'ai'>('templates');

  const queryClient = useQueryClient();

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['templates', selectedCategory, showFavorites, searchTerm],
    queryFn: async () => {
      if (searchTerm) {
        return messageTemplateApi.search(searchTerm);
      }
      if (showFavorites) {
        return messageTemplateApi.getFavorites();
      }
      if (selectedCategory) {
        return messageTemplateApi.getByCategory(selectedCategory);
      }
      return messageTemplateApi.getAll();
    },
    enabled: isOpen
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: templateCategoryApi.getAll,
    enabled: isOpen
  });

  // Use template mutation
  const useTemplateMutation = useMutation({
    mutationFn: messageTemplateApi.use,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    }
  });

  const handleSelectTemplate = (template: MessageTemplate) => {
    useTemplateMutation.mutate(template.id);
    onSelectTemplate(template);
  };

  const handleCreateTemplate = () => {
    setIsCreateModalOpen(true);
  };

  const handleAIGenerate = () => {
    setIsAIModalOpen(true);
  };

  const filteredTemplates = templates.filter(template => {
    if (selectedCategory && template.categoryId !== selectedCategory) return false;
    if (showFavorites && !template.isFavorite) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Message Templates</h2>
            <p className="text-sm text-gray-500">
              Choose a template for {contactName} at {contactCompany}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'templates'
                ? 'text-linkedin-blue border-b-2 border-linkedin-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'ai'
                ? 'text-linkedin-blue border-b-2 border-linkedin-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            AI Generate
          </button>
        </div>

        {activeTab === 'templates' ? (
          <>
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      showFavorites
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={handleCreateTemplate}
                  className="flex items-center gap-2 px-4 py-2 bg-linkedin-blue text-white rounded-lg hover:bg-linkedin-blue-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Template
                </button>
                <button
                  onClick={handleAIGenerate}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Generate
                </button>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {templatesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-linkedin-blue"></div>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || selectedCategory || showFavorites
                      ? 'Try adjusting your filters or search terms.'
                      : 'Create your first template to get started.'}
                  </p>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-4 py-2 bg-linkedin-blue text-white rounded-lg hover:bg-linkedin-blue-dark transition-colors"
                  >
                    Create Template
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={() => handleSelectTemplate(template)}
                      contactName={contactName}
                      contactTitle={contactTitle}
                      contactCompany={contactCompany}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 p-6">
            <AIGenerateModal
              isOpen={true}
              onClose={() => setActiveTab('templates')}
              onTemplateGenerated={(template) => {
                queryClient.invalidateQueries({ queryKey: ['templates'] });
                onSelectTemplate(template);
              }}
              contactName={contactName}
              contactTitle={contactTitle}
              contactCompany={contactCompany}
            />
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      <CreateTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTemplateCreated={() => {
          queryClient.invalidateQueries({ queryKey: ['templates'] });
          setIsCreateModalOpen(false);
        }}
      />

      {/* AI Generate Modal */}
      <AIGenerateModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onTemplateGenerated={(template) => {
          queryClient.invalidateQueries({ queryKey: ['templates'] });
          onSelectTemplate(template);
        }}
        contactName={contactName}
        contactTitle={contactTitle}
        contactCompany={contactCompany}
      />
    </div>
  );
};

export default TemplateModal;
