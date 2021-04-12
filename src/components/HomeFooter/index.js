export default function HomeFooter() {
    return (
        <div className="mt-4 bg-code-block">
            <div className="flex flex-col justify-between w-full max-w-6xl p-4 mx-auto space-y-2 sm:flex-row sm:space-y-0">
                <a
                    className="flex flex-row items-baseline space-x-1 hover:underline"
                    href="https://github.com/mauriciord/my-blog"
                    target="_blank"
                >
                    <span className="text-sm">View Source Code On</span>
                    <div className="text-base font-bold">Github</div>
                </a>
                <a
                    className="flex flex-row items-baseline space-x-1 hover:underline"
                    href="https://twitter.com/mauriciord"
                    target="_blank"
                >
                    <span className="text-sm">Made by</span>
                    <div className="text-base font-bold">Mauricio</div>
                </a>
            </div>
        </div>
    );
}
