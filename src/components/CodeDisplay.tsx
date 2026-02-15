'use client';

interface CodeDisplayProps {
    code: string;
    activeLine?: number;
}

export default function CodeDisplay({ code, activeLine }: CodeDisplayProps) {
    const lines = code.split('\n');

    return (
        <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-darker/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-secondary/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-text-muted font-mono ml-2">algorithm.js</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono leading-relaxed border-collapse">
                    <tbody>
                        {lines.map((line, i) => {
                            const lineNum = i + 1;
                            const isActive = activeLine === lineNum;
                            return (
                                <tr
                                    key={i}
                                    className={`transition-all duration-200 ${isActive
                                            ? 'bg-primary/15'
                                            : ''
                                        }`}
                                >
                                    <td
                                        className={`w-10 text-right pr-4 pl-4 py-0.5 select-none align-top border-r ${isActive
                                                ? 'text-primary border-primary border-r-2'
                                                : 'text-text-muted border-transparent border-r-2'
                                            }`}
                                        style={{ userSelect: 'none' }}
                                    >
                                        {lineNum}
                                    </td>
                                    <td
                                        className={`pl-4 pr-4 py-0.5 whitespace-pre ${isActive ? 'text-white' : 'text-text-secondary'
                                            }`}
                                    >
                                        {line || ' '}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
