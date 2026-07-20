export const formatDate = (selectedDate: Date) => {
        const day = String(selectedDate.getDate()).padStart(2, '0')
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
        const year = selectedDate.getFullYear()
        return `${day}/${month}/${year}`
    }