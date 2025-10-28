/**
 * Универсальный контроллер для работы с localStorage / sessionStorage.
 * Поддерживает любые типы данных.
 */
export class CacheController {
    /**
     * Сохраняет данные в указанное хранилище.
     * @param key — ключ для хранения
     * @param data — данные любого типа
     * @param useSession — true для sessionStorage, false для localStorage
     */
    static save<T>(key: string, data: T, useSession = false): void {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.error(`Ошибка при сохранении данных в ${useSession ? 'session' : 'local'}Storage:`, err);
      }
    }
  
    /**
     * Загружает данные из хранилища.
     * @param key — ключ для загрузки
     * @param useSession — true для sessionStorage, false для localStorage
     * @returns данные нужного типа или null, если нет данных
     */
    static load<T>(key: string, useSession = false): T | null {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        const data = storage.getItem(key);
        return data ? JSON.parse(data) as T : null;
      } catch (err) {
        console.error(`Ошибка при загрузке данных из ${useSession ? 'session' : 'local'}Storage:`, err);
        return null;
      }
    }
  
    /**
     * Удаляет данные по ключу.
     */
    static remove(key: string, useSession = false): void {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.removeItem(key);
      } catch (err) {
        console.error(`Ошибка при удалении данных из ${useSession ? 'session' : 'local'}Storage:`, err);
      }
    }
  
    /**
     * Полностью очищает выбранное хранилище.
     */
    static clear(useSession = false): void {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.clear();
      } catch (err) {
        console.error(`Ошибка при очистке ${useSession ? 'session' : 'local'}Storage:`, err);
      }
    }
  }
  