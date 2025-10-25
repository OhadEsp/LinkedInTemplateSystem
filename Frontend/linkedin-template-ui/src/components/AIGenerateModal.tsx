import React, { useState } from 'react';
import { X, Sparkles, Wand2, Copy, RefreshCw } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageTemplateApi, templateCategoryApi } from '../services/api';
import { GenerateTemplate, MessageTemplate } from '../types';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateGenerated: (template: MessageTemplate) => void;
  contactName: string;
  contactTitle: string;
  contactCompany: string;
}

const AIGenerateModal: React.FC<AIGenerateModalProps> = ({
  isOpen,
  onClose,
  onTemplateGenerated
}) => {
  const [formData, setFormData] = useState({
    prompt: '',
    categoryId: 1,
    context: '',
    tone: 'Professional'
  });

  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: templateCategoryApi.getAll,
    enabled: isOpen
  });

  // Generate template mutation
  const generateTemplateMutation = useMutation({
    mutationFn: messageTemplateApi.generate,
    onSuccess: (template) => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      onTemplateGenerated(template);
    },
    onError: (error) => {
      console.error('Failed to generate template:', error);
    }
  });

  const handleGenerate = async () => {
    if (!formData.prompt.trim()) return;

    setIsGenerating(true);
    try {
      const generateData: GenerateTemplate = {
        prompt: formData.prompt,
        categoryId: formData.categoryId,
        context: formData.context,
        tone: formData.tone
      };

      const template = await messageTemplateApi.generate(generateData);
      setGeneratedContent(template.content);
    } catch (error) {
      console.error('Failed to generate template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTemplate = () => {
    if (generatedContent) {
      generateTemplateMutation.mutate({
        prompt: formData.prompt,
        categoryId: formData.categoryId,
        context: formData.context,
        tone: formData.tone
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toneOptions = [
    'Professional',
    'Friendly',
    'Casual',
    'Formal',
    'Enthusiastic',
    'Conversational'
  ];

  const quickPrompts = [
    'Professional introduction to a new connection',
    'Follow-up after a networking event',
    'Sales outreach for a product demo',
    'Thank you message after a meeting',
    'Job application follow-up',
    'Reconnecting with an old colleague'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Template Generator</h2>
              <p className="text-sm text-gray-500">Generate personalized LinkedIn messages with AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Prompts */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Start</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleInputChange('prompt', prompt)}
                  className="text-left p-3 text-sm border border-gray-200 rounded-lg hover:border-linkedin-blue hover:bg-linkedin-blue-light transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Prompt */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What kind of message do you want to create? *
              </label>
              <textarea
                id="prompt"
                value={formData.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                rows={3}
                placeholder="Describe the purpose of your message, e.g., 'Introduce myself to a potential client for our software solution'"
                required
              />
            </div>

            {/* Category and Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                >
                  {toneOptions.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Context */}
            <div>
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                id="context"
                value={formData.context}
                onChange={(e) => handleInputChange('context', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                rows={2}
                placeholder="Any additional context, like industry, company size, relationship, etc."
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!formData.prompt.trim() || isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Template
                </>
              )}
            </button>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Generated Template</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-linkedin-blue hover:text-linkedin-blue-dark transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {generatedContent}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={generateTemplateMutation.isPending}
                  className="px-4 py-2 bg-linkedin-blue text-white rounded-lg hover:bg-linkedin-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {generateTemplateMutation.isPending ? 'Saving...' : 'Save Template'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerateModal;
