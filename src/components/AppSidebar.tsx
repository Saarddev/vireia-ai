
import React from 'react';
import { FileText, Home, Briefcase, BarChart3, BookOpen, Layers, Cog, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  currentPage?: string;
}

const AppSidebar = ({ currentPage }: AppSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string, pageName?: string) => {
    if (pageName && currentPage) {
      return currentPage === pageName;
    }
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="rounded-lg p-1.5" style={{ backgroundColor: '#7c3bed' }}>
            <FileText className="h-5 w-5 text-white" />
          </div>
          <Link to="/" className="font-bold text-xl text-[#7c3bed]">
            Vireia AI
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Home" isActive={isActive("/dashboard", "home")} asChild>
                  <Link to="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="My Resumes" isActive={isActive("/resume", "resumes")} asChild>
                  <Link to="/resume">
                    <FileText className="h-5 w-5" />
                    <span>My Resumes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Applications" isActive={isActive("/applications", "applications")} asChild>
                  <Link to="/applications">
                    <Briefcase className="h-5 w-5" />
                    <span>Applications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics" isActive={isActive("/analytics", "analytics")} asChild>
                  <Link to="/analytics">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Learn" asChild>
                  <Link to="/learning">
                    <BookOpen className="h-5 w-5" />
                    <span>Learning Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Templates" isActive={isActive("/templates", "templates")} asChild>
                  <Link to="/templates">
                    <Layers className="h-5 w-5" />
                    <span>Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" asChild>
              <Link to="/settings">
                <Cog className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Account" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log Out" asChild>
              <button onClick={() => console.log('Sign out')}>
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
