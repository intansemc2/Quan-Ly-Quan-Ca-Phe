import random
import hashlib

if (__name__ == "__main__"):
	nhanviens = list()

	for i in range(0, 100):
		idnv = "{:d}".format(i)
		ten = "Nhân viên {:d}".format(i)
		sdt = "+{:d} {:d}".format(random.randint(10, 99), random.randint(1000000, 100000000))
		username = "user{:d}".format(i)
		password = hashlib.md5(username.encode("utf-8")).hexdigest()
		accountType = "NV"

		nhanviens.append({
			"id" : idnv,
			"ten" : ten,
			"sdt" : sdt,
			"username" : username,
			"password" : password,
			"type" : accountType
		})

	with open("nhanviens.txt", "w+") as nhanviens_file:
		for nhanvien in nhanviens:
			htmlString = "<tr><th>{:s}</th><th>{:s}</th><th>{:s}</th><th>{:s}</th><th>{:s}</th><th>{:s}</th></tr>".format(nhanvien["id"], nhanvien["ten"], nhanvien["sdt"], nhanvien["username"], nhanvien["password"], nhanvien["type"])
			nhanviens_file.write(htmlString)
			nhanviens_file.write("\n")