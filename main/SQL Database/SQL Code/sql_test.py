import  sys

# module import
import mariadb
import sys

# Instantiate Connection
try:
    conn = mariadb.connect(
      user="root",
      password="",
      host="localhost",
      port=3306)
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Instantiate Cursor
cur = conn.cursor()


def get_system(cur):
    systems = []

    tileid = 66

    cur.execute("SELECT f.name, t.forts "
                "FROM w7f_map.tiles AS t, w7f_map.faction AS f "
                "WHERE t.tileid=" + str(tileid) + " AND t.facid=f.facid")

    for (name, forts) in cur:
        systems.append(f"{name} {forts}")

    print("\n" .join(systems))


get_system(cur)
