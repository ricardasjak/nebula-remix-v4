interface Props {
	title: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
	return <h1 className={'text-lg mb-4 mt-2'}>{title}</h1>;
};
