export default function Footer() {
	return (
		<>
			<hr className="border-1 border-gold" />
			<div className="mt-auto text-primary w-full text-center py-4">
				<div className="text-xs flex items-center justify-center gap-2">
					<div>
						<span>
							Copyright &copy; 
							{ ' ' }
							{ ' ' }
							{ new Date().getFullYear() }
						</span>
					</div>
					<span className="flex items-center gap-2">
						| 
						<span className="font-bold">coacher.</span>
					</span>
				</div>
			</div>
		</>
	);
}
