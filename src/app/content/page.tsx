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
                        <DialogContent className="bg-[#1A1A1A]  border-none text-[#ffffff]">
                            <DialogHeader>
                                <DialogTitle className="text-center text-[30px]">Filters</DialogTitle>
                                <div className="border-b w-[100%] border-b-[#FFCC70]">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">Price</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex items-center ">
                                                    <div className="">
                                                        <input className="inline-block bg-[#3E3E3E] px-[5px] py-[10px] w-[50%] rounded-[10px]" type="number" placeholder="From" />
                                                    </div>

                                                    <div className="">
                                                        <p>Computers found with filter:</p> 
                                                        <p className="text-center">21</p>
                                                    </div>

                                                    <div className="inline-block">
                                                        <input className="inline-block bg-[#3E3E3E] px-[5px] py-[10px] w-[50%] rounded-[10px]" type="number" placeholder="To" />
                                                    </div>
                                                </div>
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