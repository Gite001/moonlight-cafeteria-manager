
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/ProductForm";
import { toast } from "sonner";

interface OrderPanelProps {
  products: Product[];
  orderItems: Array<{ id: string; quantity: number }>;
  setOrderItems: React.Dispatch<React.SetStateAction<Array<{ id: string; quantity: number }>>>;
}

export function OrderPanel({ products, orderItems, setOrderItems }: OrderPanelProps) {
  const total = orderItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  
  const clearOrder = () => {
    setOrderItems([]);
    toast.info("Commande annulée");
  };
  
  const validateOrder = () => {
    if (orderItems.length === 0) {
      toast.error("La commande est vide");
      return;
    }
    
    toast.success("Commande validée avec succès");
    setOrderItems([]);
  };

  return (
    <div className="glass-panel rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Commande</h2>
      <div className="space-y-4">
        {orderItems.length > 0 ? (
          orderItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return product ? (
              <div key={item.id} className="flex justify-between items-center">
                <span>
                  {product.name} x{item.quantity}
                </span>
                <span>{(product.price * item.quantity).toFixed(2)} MAD</span>
              </div>
            ) : null;
          })
        ) : (
          <p className="text-center text-muted-foreground py-4">Aucun article dans la commande</p>
        )}
        
        {orderItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)} MAD</span>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-moonlight hover:bg-moonlight-dark"
            onClick={validateOrder}
            disabled={orderItems.length === 0}
          >
            Valider
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearOrder}
            disabled={orderItems.length === 0}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}
