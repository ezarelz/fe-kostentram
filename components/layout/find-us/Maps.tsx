import styles from './Maps.module.css';

export default function Maps() {
  return (
    <section className={styles.contactPage}>
      <h2 className={styles.title}>Lokasi Kami</h2>

      <div className={styles.mapGrid}>
        {/* Location 1 */}
        <div className={styles.mapItem}>
          <h3 className={styles.locationLabel}>📍 Tentram Panbar, Jakarta</h3>
          <div className={styles.mapContainer}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.88454722189928!2d106.83556960152922!3d-6.24359046264051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f0ee0bce91%3A0x9f03fc4f7beba952!2sKos%20Tentram!5e0!3m2!1sen!2sid!4v1761907554681!5m2!1sen!2sid'
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Tentram Pancoran Barat Jakarta'
            />
          </div>
        </div>

        {/* Location 2 */}
        <div className={styles.mapItem}>
          <h3 className={styles.locationLabel}>📍 Tentram Pekayon, Bekasi</h3>
          <div className={styles.mapContainer}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d247.8744504811273!2d106.98463863171882!3d-6.264885662765125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTUnNTMuNSJTIDEwNsKwNTknMDUuMSJF!5e0!3m2!1sen!2sid!4v1761904663155!5m2!1sen!2sid'
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Tentram Pekayon Bekasi'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
