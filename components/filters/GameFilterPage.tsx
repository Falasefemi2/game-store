import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SearchBar } from "../Navigation"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { db } from "@/app/db"
import { platforms } from "@/app/db/schema"
import { PlatformToggle } from "../platform"


export default async function Component() {
    const allPlatforms = await db.select().from(platforms)



    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Platforms
                    </CardTitle>
                </div>
            </CardHeader>
            <Separator />
            <SearchBar basePath="search" />
            <CardContent className="p-6 text-sm">

                <Accordion type="single" collapsible>
                    <AccordionItem value="platform">
                        <AccordionTrigger>Platforms</AccordionTrigger>
                        <AccordionContent>
                            {allPlatforms.map(platform => (
                                <PlatformToggle key={platform.id} platform={platform} />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

    )
}


