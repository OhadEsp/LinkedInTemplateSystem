export interface MessageTemplate {
  id: number;
  title: string;
  content: string;
  description?: string;
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  isFavorite: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  tags?: string;
  isAIGenerated: boolean;
  aiPrompt?: string;
}

export interface CreateMessageTemplate {
  title: string;
  content: string;
  description?: string;
  categoryId: number;
  tags?: string;
}

export interface UpdateMessageTemplate {
  title: string;
  content: string;
  description?: string;
  categoryId: number;
  isFavorite: boolean;
  tags?: string;
}

export interface GenerateTemplate {
  prompt: string;
  categoryId: number;
  context?: string;
  tone?: string;
}

export interface TemplateCategory {
  id: number;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  isActive: boolean;
  templateCount: number;
}

export interface CreateTemplateCategory {
  name: string;
  description?: string;
  color: string;
  icon: string;
}

export interface UpdateTemplateCategory {
  name: string;
  description?: string;
  color: string;
  icon: string;
  isActive: boolean;
}
