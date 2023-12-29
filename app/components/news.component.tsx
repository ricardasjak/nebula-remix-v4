import { Link } from '@remix-run/react';
import { type PersonalProbeNews } from '~/app.model';
import { cx } from '~/cx';
import { routesUtil } from '~/routes.util';
import { timeDiff } from '~/utils';

interface Props {
	news: PersonalProbeNews[];
}

export const NewsComponent: React.FC<Props> = ({ news }) => {
	return (
		<ul>
			{news.map(n => {
				return (
					<li key={n.id}>
						<div className='grid grid-cols-2 my-2' style={{ gridTemplateColumns: '1fr 4fr' }}>
							<div className='col-span-2'>
								{/*<span>{new Date(n.at).toISOString().substring(11, 19)}</span>*/}
								{/*&nbsp;*/}
								<span>{timeDiff(new Date().getTime() - new Date(n.at).getTime())} ago.</span>
								&nbsp;
								<span className='ml-2'>
									{n.attackerId ? (
										<Link to={routesUtil.world.target(n.attackerId)} className='text-secondary'>
											{n.attackerName}&nbsp;
										</Link>
									) : (
										<span></span>
									)}
								</span>
								<span className={cx('col-span-2', n.success ? '' : '')}>{n.report}.</span>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};
