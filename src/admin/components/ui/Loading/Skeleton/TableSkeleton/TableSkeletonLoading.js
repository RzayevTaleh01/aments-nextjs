export default function SgTableSkeletonLoading(props) {
    const { full = true, rows = 5, columns = 4 } = props;

    const tBodyChildren = [...Array(rows)].map((_, rowIdx) => (
                <tr key={rowIdx}>
                    {[...Array(columns)].map((_, colIdx) => (
                        <td key={colIdx} className="">
                            <div className={["h-4 rounded animate-pulse",  rowIdx % 2 === 0 ? 'bg-gray-200' : 'bg-white'].join(' ').trim()}></div>
                        </td>
                    ))}
                </tr>
            ))

    return (
        full ?
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    {[...Array(columns)].map((_, idx) => (
                        <th key={idx} className="">
                            <div className={["bg-gray-300 rounded w-3/4 animate-pulse"].join(' ').trim()}></div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {tBodyChildren}
                </tbody>
            </table>
            :
            tBodyChildren
    );
};