export default function Footer() {
	return (
		<div className="mt-auto bg-neutral text-accent w-full h- text-center py-4">
			<span className="text-xs font-bold">
				Copyright &copy; 
				{ ' ' }
				{ ' ' }
				{ new Date().getFullYear() }
			</span>
		</div>
	);
}
