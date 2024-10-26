import RoomFooter from "@/components/room-footer";
import RoomHeader from "@/components/room-header";

export default function RoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-svh flex flex-col items-center">
            <RoomHeader />
            <div className="flex flex-col flex-grow items-center justify-center">
                {children}
            </div>
            <RoomFooter />
        </main>
    );
}
