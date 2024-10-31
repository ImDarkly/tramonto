import CreateRoom from "@/components/create-room";
import JoinRoom from "@/components/join-room";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function Index() {
    return (
        <Card className="flex flex-col border-transparent bg-transparent gap-8">
            <CardHeader className="w-full flex">
                <CardTitle>Join or Create Room</CardTitle>
                <CardDescription className="max-w-[280px] break-words w-fit ">
                    Enter a room code to join or create a new room
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0 w-full">
                <JoinRoom />
            </CardContent>
            <CardFooter className="w-full">
                <CreateRoom />
            </CardFooter>
        </Card>
    );
}
