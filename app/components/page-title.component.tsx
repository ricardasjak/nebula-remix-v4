interface Props {
	title: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
	return <h1 className={'text-lg text-primary'}>{title}</h1>;
};