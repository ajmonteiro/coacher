type SidebarSectionTitleProps = {
	title: string
	collapsed?: boolean
	description?: string
};

export default function SidebarSectionTitle({
	title, description, collapsed 
}: SidebarSectionTitleProps) {
	return (
		<div className="flex flex-col gap-1">
			{
				collapsed 
					? (
						<>
							<h2 className="text-base-content text-sm font-bold">{ title }</h2>
							{
								description 
									? <span className="text-xs font-thin text-base-content">{ description }</span>	
									: null 
							}
						</>
					)
					: null 
			}
		</div>
	);
}
