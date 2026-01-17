'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Order, OrderStatus } from '@/lib/types';
import { getWhatsAppTemplateSuggestion } from '@/app/actions';
import type { SuggestWhatsAppTemplateOutput } from '@/ai/flows/suggest-whatsapp-template';
import { Bot, Send } from 'lucide-react';

interface StatusUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  nextStatus: OrderStatus;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export function StatusUpdateDialog({
  open,
  onOpenChange,
  order,
  nextStatus,
  onUpdateStatus,
}: StatusUpdateDialogProps) {
  const [suggestion, setSuggestion] = useState<SuggestWhatsAppTemplateOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setSuggestion(null);
      getWhatsAppTemplateSuggestion({
        orderStatus: nextStatus,
        orderId: order.id,
        customerPhoneNumber: order.customerPhone,
      }).then((result) => {
        setSuggestion(result);
        setIsLoading(false);
      });
    }
  }, [open, nextStatus, order.id, order.customerPhone]);

  const handleConfirm = () => {
    onUpdateStatus(order.id, nextStatus);
    onOpenChange(false);
  };
  
  const formatMessage = () => {
    if (!suggestion) return "Loading message...";
    
    let message = `Template: ${suggestion.templateName}`;
    if (suggestion.templateParameters) {
        const params = Object.entries(suggestion.templateParameters)
            .map(([key, value]) => `  ${key}: "${value}"`)
            .join(',\n');
        message += `\nParameters: {\n${params}\n}`;
    }
    return message;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Confirm updating order <span className="font-bold">{order.id}</span> from "{order.status}" to "{nextStatus}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI-Suggested WhatsApp Message
          </h3>
          <div className="p-4 rounded-lg bg-secondary/50 border">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="text-sm space-y-2">
                <p className="font-mono bg-muted p-3 rounded text-xs whitespace-pre-wrap">{formatMessage()}</p>
                <p className="text-xs text-muted-foreground">This message will be sent automatically to {order.customerPhone}.</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            <Send className="mr-2 h-4 w-4" />
            Confirm & Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
