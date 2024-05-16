import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * TODO: get from BE side
 */
export default function ActiveEvent({ mobile = false }: { mobile?: boolean }) {
  return (
    <Card>
      <CardHeader className={cn({ "p-2 pt-0 md:p-4": !mobile })}>
        <CardTitle>Targi Książki</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          Szczegół
        </Button>
      </CardContent>
    </Card>
  );
}
