import React, { useEffect, useRef } from 'react';

type SvgProps = {
	element: React.ReactNode | (() => JSX.Element) | ((props?: any) => JSX.Element)
	dynamicAttributes?: Record<string, string | ((element: React.ReactElement) => string)>
	fill?: string | ((element: React.ReactElement) => string) | null
};

const applyAttributes = (
	element: React.ReactNode | JSX.Element | (() => JSX.Element) | ((props?: any) => JSX.Element),
	fill: string | ((element: React.ReactElement) => string) | null | undefined,
	dynamicAttributes: Record<string, string | ((element: React.ReactElement) => string)> | undefined,
	width: string | undefined,
	height: string | undefined
): React.ReactNode => {
	if (React.isValidElement(element)) {
		const newProps = {
			...element.props
		};

		if (dynamicAttributes) {
			for (const [attr, value] of Object.entries(dynamicAttributes)) {
				if (typeof value === 'function') {
					newProps[attr] = value(element);
				}
				else {
					newProps[attr] = value;
				}
			}
		}

		const children = element.props.children;
		if (children) {
			newProps.children = Array.isArray(children)
				? children.map((child, index) => {
					const modifiedChild = applyAttributes(child, fill, dynamicAttributes, width, height);

					if (React.isValidElement(modifiedChild)) {
						const childKey = modifiedChild.key ?? modifiedChild.props?.id ?? index; // Use id or index as last resort
						return React.cloneElement(modifiedChild, {
							key: childKey 
						});
					}
					return modifiedChild;
				})
				: applyAttributes(children, fill, dynamicAttributes, width, height);
		}

		// Conditional fill change for target elements
		if (element.type === 'path' || element.type === 'circle' || element.type === 'rect' || element.type === 'ellipse' || element.type === 'line' || element.type === 'polygon') {
			if (element.props.fill === '#000000') {
				if (fill) {
					if (typeof fill === 'function') {
						const elementWithProps = element as React.ReactElement & { props: Record<string, any> };
						newProps.fill = fill(elementWithProps);
					}
					else {
						newProps.fill = fill;
					}
				}
			}
		}

		// Apply width and height here, *before* cloning
		if (width) {
			newProps.width = width;
		}
		if (height) {
			newProps.height = height;
		}

		return React.cloneElement(element, newProps);
	}
	else if (typeof element === 'string') {
		return element;
	}
	else if (typeof element === 'function') {
		const renderedElement = element();
		return applyAttributes(renderedElement, fill, dynamicAttributes, width, height);
	}
	return element;
};

export default function Svg({
	element, fill = 'var(--gold)', dynamicAttributes, width = '100%', height = '100%'
}: SvgProps & { height?: string
	width?: string }) {
	const svgRef = useRef<SVGSVGElement>(null);
	const pathsRef = useRef<SVGPathElement[]>([]);

	useEffect(() => {
		if (svgRef.current) {
			const paths = svgRef.current.querySelectorAll('path, circle, rect, ellipse, line, polygon');
			pathsRef.current = Array.from(paths) as SVGPathElement[];

			if (fill) {
				pathsRef.current.forEach((path) => {
					if (path.getAttribute('fill') === '#000000') {
						if (typeof fill === 'function') {
							const pathWithProps = path as SVGPathElement & { props: Record<string, any> };
							path.setAttribute('fill', fill({
								...pathWithProps,
								props: {
									fill: path.getAttribute('fill')
								}
							} as unknown as React.ReactElement));
						}
						else {
							path.setAttribute('fill', fill);
						}
					}
				});
			}
		}
	}, [svgRef.current, fill]);

	const renderedElement = typeof element === 'function' ? element() : element;

	const modifiedElement = applyAttributes(renderedElement, fill, dynamicAttributes, width, height);

	if (React.isValidElement(modifiedElement)) {
		return modifiedElement;
	}
	else if (typeof modifiedElement === 'string' || typeof modifiedElement === 'number') {
		return modifiedElement;
	}
	else if (modifiedElement) {
		return <>{ modifiedElement }</>;
	}

	return null;
}
