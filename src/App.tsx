import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { Shell } from "@/components/Shell"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { DatePicker } from "@/components/ui/date-picker"
import { InputWithButton } from "@/components/ui/input-with-button"
import { Kbd } from "@/components/ui/kbd"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPage, PaginationPrevious } from "@/components/ui/pagination"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ResizableSeparator } from "@/components/ui/resizable"
import { Sonner } from "@/components/ui/sonner"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline, TimelineContent, TimelineItem, TimelineSeparator, TimelineTrack } from "@/components/ui/timeline"
import { useFormField } from "@/components/ui/form"
import { useOrigin } from "@/hooks/use-origin"
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"
import { useIntersection } from "@/hooks/use-intersection"
import { useDebounce } from "@/hooks/use-debounce"
import { useEventListener } from "@/hooks/use-event-listener"
import { useCookies } from "@/hooks/use-cookies"
import { useTheme } from "@/hooks/use-theme"
import { useHydrated } from "@/hooks/use-hydrated"
import { useToastContext } from "@/hooks/use-toast-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { useResumeData } from "@/hooks/use-resume-data"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { UserAuthForm } from "@/components/user-auth-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { AccountForm } from "@/components/dashboard/account-form"
import { Categories } from "@/components/dashboard/categories"
import { ProductsTable } from "@/components/dashboard/products-table"
import { CreateProductForm } from "@/components/dashboard/create-product-form"
import { EditProductForm } from "@/components/dashboard/edit-product-form"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Search } from "@/components/dashboard/search"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsShell } from "@/components/products/products-shell"
import { Cart } from "@/components/cart/cart"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { CheckoutButton } from "@/components/cart/checkout-button"
import { CartLineItem } from "@/components/cart/cart-line-item"
import { CartTable } from "@/components/cart/cart-table"
import { CartWrapper } from "@/components/cart/cart-wrapper"
import { EmptyCart } from "@/components/cart/empty-cart"
import { PaymentForm } from "@/components/checkout/payment-form"
import { AddressForm } from "@/components/checkout/address-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { CheckoutShell } from "@/components/checkout/checkout-shell"
import { CheckoutCart } from "@/components/checkout/checkout-cart"
import { CheckoutOrder } from "@/components/checkout/checkout-order"
import { CheckoutPayment } from "@/components/checkout/checkout-payment"
import { CheckoutAddress } from "@/components/checkout/checkout-address"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"
import { PricingCards } from "@/components/marketing/pricing-cards"
import { Features } from "@/components/marketing/features"
import { Hero } from "@/components/marketing/hero"
import { Footer } from "@/components/marketing/footer"
import { Testimonials } from "@/components/marketing/testimonials"
import { Examples } from "@/components/marketing/examples"
import { DocsHeader } from "@/components/docs/docs-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsShell } from "@/components/docs/docs-shell"
import { DocsFooter } from "@/components/docs/docs-footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { EditableContent } from "@/components/resume-preview/EditableResumePreview"
import { BuilderHeader } from "@/components/resume-builder/BuilderHeader"
import { BuilderSidebar } from "@/components/resume-builder/BuilderSidebar"
import { PreviewControls } from "@/components/resume-preview/PreviewControls"
import { ModernTemplate } from "@/components/resume-preview/ModernTemplate"
import { AIHoverToolkit } from "@/components/AIHoverToolkit"
import ResumePreview from "@/components/ResumePreview"
import Resume from './pages/Resume';
import EditorCanvas from './pages/EditorCanvas';
import JobPostings from './pages/JobPostings';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-ts-shadcn">
      <Router>
        <Routes>
          <Route path="/" element={<Resume />} />
          <Route path="/sign-in" element={<UserAuthForm />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/builder/:resumeId" element={<EditorCanvas />} />
          <Route path="/resume/canvas/:resumeId" element={<Resume />} />
          <Route path="/jobs" element={<JobPostings />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
