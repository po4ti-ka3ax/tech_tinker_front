import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Content = () => {
    return (
        <>
            <div className="">

                <h1 className="text-center text-[50px]">Choose computer for yourself</h1>
                <div className="">
                    <Dialog>
                        <DialogTrigger>Filters</DialogTrigger>
                        <DialogContent className="bg-[#1A1A1A] border-none text-[#ffffff]">
                            <DialogHeader>
                                <DialogTitle className="text-center text-[30px]">Filters</DialogTitle>
                                <div className="border-b w-[100%] border-b-[#FFCC70]">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">Price</AccordionTrigger>
                                            <AccordionContent>
                                                Yes. It adheres to the WAI-ARIA design pattern.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default Content