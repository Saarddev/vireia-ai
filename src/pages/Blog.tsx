
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { AlertCircle } from 'lucide-react';

const Blog = () => {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false });

            if (error) throw error;
            return data;
        },
    });

    const { data: featuredBlogs } = useQuery({
        queryKey: ['featured-blogs'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('is_published', true)
                .eq('is_featured', true)
                .order('published_at', { ascending: false })
                .limit(3);

            if (error) throw error;
            return data;
        },
    });

    const categories = blogs ? [...new Set(blogs.map(blog => blog.category))] : [];

    return (
        <div className="min-h-screen bg-background">
            <head>
                <title>Vireia Blog </title>
                <meta name="description" content="Read the latest articles and insights on resume building, job searching, and career development." />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Vireia Blog" />
                <meta property="og:description" content="Read the latest articles and insights on resume building, job searching, and career development." />
                <meta property="og:image" content="/https://cdn.sanity.io/images/mrfd4see/production/e3f234428152d737495819dd61790c8cb1cbdc3c-1498x878.png?w=2000&fit=max&auto=format" />
                <meta property="og:url" content="https://www.vireia.com/blog" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Vireia Blog" />
                <meta name="twitter:description" content="Read the latest articles and insights on resume building, job searching, and career development." />
                <meta name="twitter:image" content="https://cdn.sanity.io/images/mrfd4see/production/e3f234428152d737495819dd61790c8cb1cbdc3c-1498x878.png?w=2000&fit=max&auto=format" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="canonical" href="https://www.vireia.com/blog" />
            </head>
            <Navbar />
            <main className="flex-1">
                <BlogHero featuredBlogs={featuredBlogs || []} />

                <div className="container mx-auto px-4 py-16">
                    {isLoading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="animate-pulse space-y-6">
                                    <div className="h-64 bg-muted rounded-lg"></div>
                                    <div className="h-48 bg-muted rounded-lg"></div>
                                    <div className="h-48 bg-muted rounded-lg"></div>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="animate-pulse space-y-4">
                                    <div className="h-32 bg-muted rounded-lg"></div>
                                    <div className="h-48 bg-muted rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="text-center">
                                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Failed to load blogs</h3>
                                <p className="text-muted-foreground">Please try again later.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <BlogGrid blogs={blogs || []} />
                            </div>
                            <div className="lg:col-span-1">
                                <BlogSidebar
                                    recentBlogs={blogs?.slice(0, 5) || []}
                                    categories={categories}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;