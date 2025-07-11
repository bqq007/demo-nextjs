export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>我是Dashboard根</h1>
            {children}
        </div>
    );
}