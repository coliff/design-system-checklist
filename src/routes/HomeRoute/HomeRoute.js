import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import ExportButton from '../../components/ExportButton';
import SectionTitle from '../../components/SectionTitle';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRight.svg';
import data from '../../data';
import { useCheckedIds } from '../../utilities/checklistsContext';
import s from './HomeRoute.module.css';

const HomeRoute = () => {
  const keys = Object.keys(data);
  const items = keys.map(k => data[k]);
  const { checkedIds } = useCheckedIds();

  const renderItem = (item) => {
    let total = 0;
    let completed = 0;

    item.sections.forEach(section => {
      total += section.checklist.length;
      completed += section.checklist.filter(item => checkedIds.includes(item.id)).length;
    });

    return (
      <Link to={`/category/${item.id}/`} className={s.listItem} key={item.id}>
        <SectionTitle title={item.title} key={item.id} total={total} completed={completed} />
        <div className={s.arrowRight}><ArrowRight /></div>
      </Link>
    );
  };

  return (
    <React.Fragment>
      <div className={s.container}>
        <Hero
          title={<>Building better<br /> design systems</>}
          subtitle="An open-source checklist to help you plan, build and grow your design system."
        >
          <ExportButton />
        </Hero>
        <ul className={s.list}>
          { items.map(renderItem) }
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HomeRoute;
