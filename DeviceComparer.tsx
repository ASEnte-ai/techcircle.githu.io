import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Flame, MessageCircle, Heart, Eye, Clock, User, ArrowUpRight, Search, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsFeedProps {
  articles: NewsArticle[];
  onLikeArticle: (id: string) => void;
  onNavigateToDevice?: (deviceId: string) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Updates' },
  { id: 'breaking', label: '🚨 Breaking' },
  { id: 'rumour', label: '🔥 Leaks & Rumours' },
  { id: 'review', label: '📢 Reviews' },
  { id: 'launch', label: '🚀 Launches' },
  { id: 'analysis', label: '📊 Analysis' },
];

export default function NewsFeed({ articles, onLikeArticle, onNavigateToDevice }: NewsFeedProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filters articles based on active category tab and search matching
  const filteredArticles = articles.filter((article) => {
    const conformsTab = activeTab === 'all' || article.category === activeTab;
    const conformsQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return conformsTab && conformsQuery;
  });

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'breaking':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'rumour':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
      case 'review':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      case 'launch':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Category Tabs & Sub Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 font-bold shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 dark:bg-brand-panel dark:border-slate-800 text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-card'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Local Feed Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search feed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-brand-input text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/60 transition-all"
          />
        </div>
      </div>

      {/* Articles Feed */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-brand-panel/60 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
          <FileText className="h-10 w-10 text-slate-400 mx-auto stroke-[1.5]" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-3">No matching articles found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
              <motion.article
                layout
                id={`article-card-${article.id}`}
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedArticle(article)}
                className="group relative flex flex-col justify-between p-6 bg-white dark:bg-brand-card rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer overflow-hidden duration-300"
              >
                {/* Background decorative accent for hot news */}
                {article.hot && (
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                )}

                <div>
                  {/* Article Label */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-full ${getCategoryTheme(article.category)}`}>
                      {article.category === 'breaking' && '🚨 '}
                      {article.category === 'rumour' && '🔥 '}
                      {article.category}
                    </span>
                    {article.hot && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-500 animate-pulse">
                        <Flame className="h-3 w-3 fill-red-500" /> HOT TOPIC
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white line-clamp-2 md:leading-snug group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Footer and author info */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                      {article.authorAvatar}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-none">{article.author}</h4>
                      <span className="text-[9px] text-slate-400 mt-0.5 inline-block">{article.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-medium">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Expandable Reading Modal Dialog */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-brand-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-50 text-left font-sans"
              id="news-read-modal"
            >
              {/* Top Bar controls */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-brand-bg/20">
                <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full ${getCategoryTheme(selectedArticle.category)}`}>
                  {selectedArticle.category === 'breaking' && '🚨 '}
                  {selectedArticle.category === 'rumour' && '🔥 '}
                  {selectedArticle.category}
                </span>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 px-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                >
                  Close Reader
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-5">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white md:leading-tight">
                  {selectedArticle.title}
                </h2>

                {/* Author row */}
                <div className="flex items-center gap-3.5 py-2.5 px-4 bg-slate-50 dark:bg-brand-card rounded-2xl text-slate-500">
                  <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {selectedArticle.authorAvatar}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold block text-slate-800 dark:text-slate-100">{selectedArticle.author}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 inline-block">Published on {selectedArticle.date} &middot; {selectedArticle.readTime}</span>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Eye className="h-3.5 w-3.5" /> {selectedArticle.views + 12} views
                    </span>
                  </div>
                </div>

                {/* Main Body content */}
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {selectedArticle.content}
                </div>

                {/* Tagged Device Connection */}
                {selectedArticle.deviceTag && onNavigateToDevice && (
                  <div className="p-4 rounded-2xl border border-dashed border-blue-200 dark:border-slate-700 bg-blue-50/25 dark:bg-slate-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-blue-600 dark:text-amber-500 tracking-wider">Related Device Specs Available</span>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                        Interested in specifications or rumours for the {selectedArticle.title.split(':')[0]}?
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedArticle.deviceTag) {
                          onNavigateToDevice(selectedArticle.deviceTag);
                        }
                        setSelectedArticle(null);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 dark:bg-amber-500 text-[11px] font-bold text-white dark:text-slate-950 rounded-lg shadow hover:bg-blue-500 dark:hover:bg-amber-400 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                    >
                      View Spec Matrix <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Action feet for liking and interaction */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between">
                <button
                  onClick={() => onLikeArticle(selectedArticle.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/35 border border-rose-200/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <Heart className="h-4 w-4 fill-rose-600" />
                  <span>Recommend Article ({selectedArticle.likes})</span>
                </button>
                <span className="text-[10px] text-slate-400">Tech Circle Reader</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
