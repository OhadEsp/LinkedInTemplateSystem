import React, { useState } from 'react';
import { Heart, Star, Copy, Eye, EyeOff } from 'lucide-react';
import { MessageTemplate } from '../types';

interface TemplateCardProps {
  template: MessageTemplate;
  onSelect: () => void;
  contactName: string;
  contactTitle: string;
  contactCompany: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  contactName,
  contactTitle,
  contactCompany
}) => {
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getPreviewContent = () => {
    let content = template.content;
    content = content.replace(/\[Name\]/g, contactName);
    content = content.replace(/\[Company\]/g, contactCompany);
    content = content.replace(/\[Role\]/g, contactTitle);
    return content;
  };

  const handleCopy = async () => {
    const processedContent = getPreviewContent();
    await navigator.clipboard.writeText(processedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const previewContent = getPreviewContent();
  const truncatedContent = previewContent.length > 150 
    ? previewContent.substring(0, 150) + '...' 
    : previewContent;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="text-lg"
            style={{ color: template.categoryColor }}
          >
            {template.categoryIcon}
          </span>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{template.title}</h3>
            <p className="text-xs text-gray-500">{template.categoryName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {template.isFavorite && (
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          )}
          {template.isAIGenerated && (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          )}
        </div>
      </div>

      {/* Description */}
      {template.description && (
        <p className="text-xs text-gray-600 mb-3">{template.description}</p>
      )}

      {/* Content Preview */}
      <div className="mb-3">
        <div className="text-sm text-gray-700 bg-gray-50 rounded p-3 border">
          {isPreviewExpanded ? previewContent : truncatedContent}
        </div>
        
        {previewContent.length > 150 && (
          <button
            onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
            className="text-xs text-linkedin-blue hover:text-linkedin-blue-dark mt-1 flex items-center gap-1"
          >
            {isPreviewExpanded ? (
              <>
                <EyeOff className="w-3 h-3" />
                Show Less
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                Show More
              </>
            )}
          </button>
        )}
      </div>

      {/* Tags */}
      {template.tags && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {template.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>Used {template.usageCount} times</span>
        <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onSelect}
          className="flex-1 px-3 py-2 bg-linkedin-blue text-white text-sm rounded-lg hover:bg-linkedin-blue-dark transition-colors"
        >
          Use Template
        </button>
        <button
          onClick={handleCopy}
          className={`px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 transition-colors ${
            isCopied ? 'text-green-600 border-green-300' : 'text-gray-700'
          }`}
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
