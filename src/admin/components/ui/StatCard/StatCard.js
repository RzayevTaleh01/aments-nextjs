import styles from "@/admin/components/ui/StatCard/StatCard.module.scss";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";

export default function StatCard(props) {
  const { label, value, iconName } = props;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.label}>{label}</div>
        {iconName ? (
          <div className={styles.icon}>
            <Icon name={iconName} size={18} />
          </div>
        ) : null}
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

